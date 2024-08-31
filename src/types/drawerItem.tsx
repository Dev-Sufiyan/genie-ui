import React from 'react';

export interface DrawerItem {
  icon: React.ReactElement;
  text: string;
  value: string;
  component: React.ReactElement;
}
