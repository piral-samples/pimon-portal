import { ActionIcon, Badge, Group, MultiSelect, MultiSelectProps, MultiSelectValueProps, rem } from '@mantine/core';
import React, { forwardRef } from 'react';
import { getRoleColor } from './roles';
import { IconX } from '@tabler/icons-react';

export interface RolesSelectProps extends Omit<MultiSelectProps, 'data' | 'onCreate'> {
  roles: Array<string>;
}

export function RolesSelect({ roles, ...rest }: RolesSelectProps) {
  return (
    <MultiSelect
      data={roles}
      label="Roles"
      placeholder="Roles"
      itemComponent={SelectItem}
      valueComponent={SelectValue}
      searchable
      withinPortal
      {...rest}
    />
  );
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ label, ...rest }: ItemProps, ref) => (
  <div ref={ref} {...rest}>
    <Group noWrap>
      <Badge color={getRoleColor(label)}>{label}</Badge>
    </Group>
  </div>
));

interface ValueProps extends MultiSelectValueProps {
  label: string;
}

function SelectValue({ label, onRemove, ...rest }: ValueProps) {
  return (
    <div {...rest}>
      <Badge
        color={getRoleColor(label)}
        rightSection={
          <ActionIcon size="xs" radius="xl" variant="transparent" onClick={onRemove}>
            <IconX size={rem(10)} />
          </ActionIcon>
        }>
        {label}
      </Badge>
    </div>
  );
}
