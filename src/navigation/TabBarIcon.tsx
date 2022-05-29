import { FontAwesome } from '@expo/vector-icons';
import { memo } from 'react';

interface IProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}

const TabBarIcon = memo<IProps>((props) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
});

export default TabBarIcon;
