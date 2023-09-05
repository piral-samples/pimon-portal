import type { PiletApi } from '@smapiot/pimon-portal-shell';
import { withPiletApi } from '@smapiot/pimon-portal-lib';
import BadgeManagementButton from './BadgeManagementButton';

export function setup(app: PiletApi) {
  app.registerExtension('profile-badge-management', withPiletApi(BadgeManagementButton));
}
