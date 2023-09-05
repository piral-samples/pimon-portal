import React, { ComponentType } from 'react';
import { MantineColor, Notification } from '@mantine/core';
import { NotificationsToastProps, NotificationOptions } from 'piral';
import { IconAlertCircle, IconAlertTriangle, IconCheck, IconInfoCircle, TablerIconsProps } from '@tabler/icons-react';

type NotificationType = NonNullable<NotificationOptions['type']>;
const typeToColorMap: Record<NotificationType, MantineColor> = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

const typeToIconMap: Record<NotificationType, ComponentType<TablerIconsProps>> = {
  info: IconInfoCircle,
  success: IconCheck,
  warning: IconAlertTriangle,
  error: IconAlertCircle,
};

export function NotificationsToast({ children, options, onClose }: NotificationsToastProps) {
  const Icon = typeToIconMap[options.type ?? 'info'];
  const color = typeToColorMap[options.type ?? 'info'];

  return (
    <Notification title={options.title} color={color} icon={<Icon size="1.1rem" />} onClose={onClose}>
      {children}
    </Notification>
  );
}
