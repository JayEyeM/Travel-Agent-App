// Logo.tsx component

import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import logo from '../../assets/FillerLogo.svg';

//width and height should be dynamic props

interface LogoProps {
    width?: string;
    height?: string;
    
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Box>
      <Image src={logo} alt="Logo" width={width} height={height} boxShadow={{ base: "none", md: "rgba(0, 0, 0, 0.35) 0px 0px 15px 5px;" }} />
    </Box>
  );
};

export default Logo;