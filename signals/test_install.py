"""Offline cold-start and preservation checks; no provider calls."""
import json
from pathlib import Path
import tempfile
import unittest

from install import install


class InstallTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name)
        (self.repo / '.git').mkdir()

    def test_cold_start_installs_disabled_unbound_profile(self):
        receipt = install(self.repo)
        self.assertEqual(receipt['external_actions'], 0)
        profile = json.loads((self.repo / receipt['profile']).read_text())
        self.assertFalse(profile['mandate']['builder_pr'])
        self.assertEqual(profile['bounds']['provider_spend_usd'], 0)
        self.assertTrue((self.repo / '.factory/signals/triage.md').is_file())
        self.assertTrue((self.repo / '.factory/docs/SIGNALS.md').is_file())
        self.assertTrue((self.repo / '.factory/docs/SIGNALS.html').is_file())
        self.assertTrue((self.repo / '.factory/docs/DOCUMENT-REVIEW.md').is_file())

    def test_reinstall_preserves_owner_profile(self):
        install(self.repo)
        profile = self.repo / '.factory/signals-profile.json'
        profile.write_text('{"owner": "local-owner"}\n')
        receipt = install(self.repo)
        self.assertEqual(profile.read_text(), '{"owner": "local-owner"}\n')
        self.assertTrue(all(item['status'] == 'unchanged' for item in receipt['files']))

    def test_conflict_aborts_before_other_assets_written(self):
        target = self.repo / '.factory/signals/scout.md'
        target.parent.mkdir(parents=True)
        target.write_text('local instructions')
        with self.assertRaises(ValueError):
            install(self.repo)
        self.assertFalse((target.parent / 'triage.md').exists())
        self.assertEqual(target.read_text(), 'local instructions')

    def test_symlink_cannot_redirect_writes(self):
        outside = self.repo / 'outside'
        outside.mkdir()
        (self.repo / '.factory').symlink_to(outside)
        with self.assertRaises(ValueError):
            install(self.repo)
        self.assertEqual(list(outside.iterdir()), [])

    def test_non_repository_rejected(self):
        (self.repo / '.git').rmdir()
        with self.assertRaises(ValueError):
            install(self.repo)


if __name__ == '__main__':
    unittest.main()
