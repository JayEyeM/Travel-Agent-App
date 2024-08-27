import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useBrandColors } from './theme';

interface MenuLinkProps {
  to: string;
  texts: string;
  isActive: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({ to, texts, isActive }) => {
    const { primary, secondary, accent, background, text } = useBrandColors();
  const activeColor = secondary;
  const defaultColor = text;

  return (
    <Button
      as={Link}
      to={to}
      variant="link"
      color={isActive ? activeColor : defaultColor}
      _hover={{ color: activeColor }}
    >
      {texts}
    </Button>
  );
};

export default MenuLink;
