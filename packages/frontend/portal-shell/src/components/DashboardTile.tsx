import { Card, Grid } from '@mantine/core';
import { DashboardTileProps } from 'piral';
import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export function DashboardTile({ columns, children, meta }: DashboardTileProps) {
  const Wrapper = ({ children }: PropsWithChildren) =>
    meta.to ? (
      <Link to={meta.to} style={{ textDecoration: 'none' }}>
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  return (
    <Grid.Col
      span={adjustSpan(12)}
      xs={adjustSpan(6 * columns)}
      sm={adjustSpan(12)}
      md={adjustSpan(6 * columns)}
      lg={adjustSpan(6 * columns)}
      xl={adjustSpan(4 * columns)}>
      <Wrapper>
        <Card withBorder shadow="sm" sx={{ height: '100%' }}>
          {children}
        </Card>
      </Wrapper>
    </Grid.Col>
  );
}

function adjustSpan(desiredCols: number, maxCols = 12) {
  return Math.min(desiredCols, maxCols);
}
