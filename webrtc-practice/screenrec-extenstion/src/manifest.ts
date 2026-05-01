import { ManifestV3Export } from 'vite-plugin-chrome-extension';

const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: 'Neon Screen Recorder',
  version: '1.0.0',
  permissions: ['downloads'],
  host_permissions: ['<all_urls>'],
  action: {
    default_popup: 'popup.html',
  },
  background: {
    service_worker: 'background.js',
  },
};

export default manifest;
