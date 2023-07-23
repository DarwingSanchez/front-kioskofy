import { NavigationEffects } from '@app/core/store/effects/navigation.effects';
import { SocketsCartPreviewEffects } from '@app/core/store/effects/sockets-cart-preview.effects';
import { AccountEffects } from './account.effects';
import { ActivityFeedEffects } from './acivity-feed.effects';
import { AuthEffects } from './auth.effects';
import { CorePageEffects } from './core-page.effects';
import { LocationsEffects } from './locations.effects';
import { LockEffects } from './lock.effects';
import { NotificationsEffects } from './notifications.effects';
import { ShoppingPreviewEffects } from './shopping-preview.effects';
import { UserEffects } from './user.effects';
import { VendorEffects } from './vendor.effects';
import { NotesEffects } from './notes.effects';
import { RecentActivityEffect } from '@app/core/store/effects/recent-activity.effect';
import { StorageLocationsEffects } from '../../../modules/lazy-routable/locations/components/storage-location/store/effects/storage-locations.effects';

export * from './auth.effects';

export const CORE_EFFECTS = [
  AuthEffects,
  CorePageEffects,
  UserEffects,
  AccountEffects,
  LocationsEffects,
  NotificationsEffects,
  ActivityFeedEffects,
  ShoppingPreviewEffects,
  NavigationEffects,
  VendorEffects,
  SocketsCartPreviewEffects,
  LockEffects,
  NotesEffects,
  RecentActivityEffect,
  StorageLocationsEffects,
];
