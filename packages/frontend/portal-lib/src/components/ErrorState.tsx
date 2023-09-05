import React from 'react';
import { EmptyState, EmptyStateProps } from './EmptyState';

export type ErrorStateProps = EmptyStateProps;

export function ErrorState(props: ErrorStateProps) {
  return (
    <EmptyState
      {...props}
      image={props.image}
      title={props.title ?? 'Error'}
      content={props.content ?? 'An error occured.'}
    />
  );
}
