import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Link,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  VStack,
  DrawerCloseButton,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box as="header" role="banner">
      {/* Skip to main content */}
      <Link
        href="/"
        position="absolute"
        left="-999px"
        _focus={{
          left: '4px',
          top: '4px',
          bg: 'white',
          zIndex: '1001',
          padding: '8px',
          borderRadius: 'md',
          boxShadow: 'md',
        }}
      >
        Skip to main content
      </Link>

      <Box
        bg={scrolling ? 'white' : 'transparent'}
        boxShadow={scrolling ? 'md' : 'none'}
        px={[4, 6, 10]}
        py={2}
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1000"
        transition="background-color 0.3s ease, box-shadow 0.3s ease"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Clickable Logo */}
          <Box ml={[0, 4]}>
            <Link as={RouterLink} to="/" aria-label="Go to homepage">
              <Image
                src="/assets/WVIS.png"
                alt="Website Logo"
                h={{ base: '40px', md: '50px' }}
              />
            </Link>
          </Box>

          {/* Desktop Nav */}
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }} mr={6}>
          {/* {['About', 'Newsletters', 'Blogs', 'Resources'].map((item, idx) => ( */}
            {['About', 'Newsletters', 'Blogs' ].map((item, idx) => (
              <Link
                key={idx}
                href={`/${item.toLowerCase()}`}
                fontWeight="medium"
                fontSize="md"
                color="gray.700"
                _hover={{ color: 'purple.600', textDecoration: 'none' }}
                aria-label={`Navigate to ${item} page`}
              >
                {item}
              </Link>
            ))}

            <Button
              as={RouterLink}
              to="/contact"
              variant="outline"
              borderColor="green.200"
              fontWeight="bold"
              _hover={{ bg: 'green.50' }}
              aria-label="Contact Us page"
            >
              Contact Us
            </Button>

            {/* Social Media Links */}
            <HStack spacing={3}>
              <Link
                href="https://www.linkedin.com"
                isExternal
                _hover={{ transform: 'scale(1.1)' }}
                aria-label="Visit LinkedIn profile"
              >
                <FaLinkedin size="20" color="#0A66C2" />
              </Link>
              <Link
                href="https://twitter.com"
                isExternal
                _hover={{ transform: 'scale(1.1)' }}
                aria-label="Visit Twitter X profile"
              >
                <FaTwitter size="20" color="#1DA1F2" />
              </Link>
              <Link
                href="https://www.instagram.com"
                isExternal
                _hover={{ transform: 'scale(1.1)' }}
                aria-label="Visit Instagram profile"
              >
                <FaInstagram size="20" color="#E1306C" />
              </Link>
              <Link
                href="https://www.facebook.com"
                isExternal
                _hover={{ transform: 'scale(1.1)' }}
                aria-label="Visit Facebook profile"
              >
                <FaFacebook size="20" color="#1877F2" />
              </Link>
              <Link
                href="https://www.youtube.com"
                isExternal
                _hover={{ transform: 'scale(1.1)' }}
                aria-label="Visit YouTube channel"
              >
                <FaYoutube size="20" color="#FF0000" />
              </Link>
            </HStack>
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open mobile menu"
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
          />
        </Flex>

        {/* Mobile Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} aria-labelledby="drawer-menu">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton aria-label="Close mobile menu" />
            <DrawerHeader id="drawer-menu">Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={4}>
                {['Home', 'About', 'Newsletters', 'Blogs'].map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/${item.toLowerCase()}`}
                    fontSize="lg"
                    fontWeight="medium"
                    _hover={{ color: 'purple.600' }}
                    aria-label={`Navigate to ${item} page in mobile menu`}
                  >
                    {item}
                  </Link>
                ))}

                <Stack spacing={3} pt={4} w="full">
                  <Button
                    as={RouterLink}
                    to="/contact"
                    w="full"
                    variant="outline"
                    borderColor="green.200"
                    fontWeight="bold"
                    onClick={onClose}
                    aria-label="Go to Contact Us page"
                  >
                    Contact Us
                  </Button>

                  {/* <Button
                    w="full"
                    bgGradient="linear(to-r, purple.400, purple.500)"
                    color="white"
                    fontWeight="bold"
                    aria-label="Login button"
                  >
                    LOGIN
                  </Button> */}
                </Stack>

                {/* Social Media in Drawer */}
                <HStack spacing={5} pt={4}>
                  <Link
                    href="https://www.linkedin.com"
                    isExternal
                    _hover={{ transform: 'scale(1.1)' }}
                    aria-label="Visit LinkedIn profile"
                  >
                    <FaLinkedin size="24" color="#0A66C2" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    isExternal
                    _hover={{ transform: 'scale(1.1)' }}
                    aria-label="Visit Twitter X profile"
                  >
                    <FaTwitter size="24" color="#1DA1F2" />
                  </Link>
                  <Link
                    href="https://www.instagram.com"
                    isExternal
                    _hover={{ transform: 'scale(1.1)' }}
                    aria-label="Visit Instagram profile"
                  >
                    <FaInstagram size="24" color="#E1306C" />
                  </Link>
                  <Link
                    href="https://www.facebook.com"
                    isExternal
                    _hover={{ transform: 'scale(1.1)' }}
                    aria-label="Visit Facebook profile"
                  >
                    <FaFacebook size="24" color="#1877F2" />
                  </Link>
                  <Link
                    href="https://www.youtube.com"
                    isExternal
                    _hover={{ transform: 'scale(1.1)' }}
                    aria-label="Visit YouTube channel"
                  >
                    <FaYoutube size="24" color="#FF0000" />
                  </Link>
                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
