'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Image,
  SimpleGrid,
  Badge,
  useColorModeValue,
  Link as ChakraLink,
  Tag,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

// 🗞 Sample Blog Data
const blogData = [
  {
    id: 1,
    title: 'AI in Education: Transforming Classrooms',
    image: '/assets/blogs/blog2.jpg',
    link: '/blogs/ai-in-education',
    tags: ['AI', 'Education'],
    desc: 'Explore how artificial intelligence is changing the way students learn and teachers teach.',
    date: new Date('2021-06-14T10:00:00Z'),
    author: 'John Doe',
  },
  {
    id: 2,
    title: 'The Future of E-Learning Platforms',
    image: '/assets/blogs/blog3.jpg',
    link: '/blogs/future-of-elearning',
    tags: ['E-Learning', 'Technology'],
    desc: 'This is a short description of article two.',
    date: new Date('2021-04-06T19:01:27Z'),
    author: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Multilingual Learning Strategies',
    image: '/assets/blogs/blog4.jpg',
    link: '/blogs/multilingual-learning',
    tags: ['Language', 'Accessibility'],
    desc: 'Learn how multilingual content empowers diverse learners globally.',
    date: new Date('2021-08-12T09:30:00Z'),
    author: 'Carlos Rivera',
  },
  {
    id: 4,
    title: 'Inclusive Design for Digital Learning',
    image: '/assets/blogs/blog5.jpg',
    link: '/blogs/inclusive-design',
    tags: ['Design', 'Inclusion'],
    desc: 'Discover principles of inclusive design that make digital education more effective.',
    date: new Date('2021-09-01T11:15:00Z'),
    author: 'Emily Chen',
  },
  {
    id: 5,
    title: 'Tools Every Educator Should Know',
    image: '/assets/blogs/blog6.jpg',
    link: '/blogs/educator-tools',
    tags: ['Tools', 'Teaching'],
    desc: 'A curated list of tools that enhance the modern teaching experience.',
    date: new Date('2022-01-15T13:45:00Z'),
    author: 'Ahmed Khan',
  },
  {
    id: 6,
    title: 'Tech Trends in 2025 Education',
    image: '/assets/blogs/blog7.jpg',
    link: '/blogs/tech-trends-2025',
    tags: ['Trends', 'Future'],
    desc: 'Get a glimpse into the future of educational technology in 2025.',
    date: new Date('2022-03-03T15:20:00Z'),
    author: 'Nina Patel',
  },
]

export default function Blog() {
  const featured = blogData[0]

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box bg="radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)" py={20} textAlign="center">
        <Heading fontSize={{ base: '3xl', md: '5xl' }}>Our Blog</Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="white.600" mt={4}>
          Discover stories, insights, and updates from our journey.
        </Text>
      </Box>

      {/* Featured Blog */}
      <Box py={16} bg={useColorModeValue('white', 'gray.800')}>
        <Container maxW="6xl">
          <Flex align="center" gap={3} mb={8}>
          <Heading fontSize="2xl">Featured Blog</Heading>
          <Badge
            bgGradient="linear(to-r, pink.400, orange.400)"
            color="white"
            fontSize="0.8em"
            px={3}
            py={1}
            borderRadius="full"
            textTransform="uppercase"
          >
            New Update
          </Badge>

        </Flex>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={10}
            align="flex-start"
            bg={useColorModeValue('gray.50', 'gray.700')}
            p={8}
            rounded="xl"
            boxShadow="md"
            wrap="wrap"
          >
            <Link to={featured.link} aria-label={`Read featured blog: ${featured.title}`}>
              <Box flexShrink={0} mb={{ base: 4, md: 0 }}>
                <Image
                  src={featured.image}
                  alt={`Featured blog: ${featured.title}`}
                  borderRadius="md"
                  w={{ base: '100%', md: '240px' }}
                  h={{ base: 'auto', md: '300px' }}
                  objectFit="contain"
                  boxShadow="lg"
                />
                <Text mt={2} fontWeight="bold" color="blue.600" fontSize={{ base: 'md', md: 'lg' }}>
                  {featured.title}
                </Text>
              </Box>
            </Link>
            <Stack flex={1} spacing={4}>
              <Heading size="lg">
                Making Education Inclusive & Accessible
                <Badge colorScheme="red" fontSize="0.4em" ml={5} px={2} py={1} borderRadius="md">NEW</Badge>
              </Heading>
              <Text color="gray.600">
                Learn how we’re bridging the gap in education through technology and accessibility. This featured post
                highlights tools, techniques, and testimonials from learners and educators alike.
              </Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                By {featured.author} • {new Date(featured.date).toLocaleDateString()}
              </Text>
              <Stack direction="row" spacing={2} mb={3}>
                {featured.tags.map((tag, i) => (
                  <Tag key={i} colorScheme="blue">
                    {tag}
                  </Tag>
                ))}
              </Stack>
              <ChakraLink as={Link} to={featured.link} color="blue.500" fontWeight="bold">
                Read Full Blog →
              </ChakraLink>
            </Stack>
          </Flex>
        </Container>
      </Box>

      {/* All Blogs */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="6xl">
          <Heading fontSize="2xl" mb={10}>
            More Articles
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
            {blogData.map((item) => (
              <BlogCard key={item.id} {...item} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Footer />
    </>
  )
}

// 🔖 Blog Card Component
const BlogCard = ({
  title,
  image,
  link,
  tags,
  desc,
  date,
  author,
}: {
  title: string
  image: string
  link: string
  tags: string[]
  desc: string
  date: Date
  author: string
}) => {
  return (
    <Box
      as={Link}
      to={link}
      aria-label={`Read blog: ${title}`}
      _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }}
      transition="all 0.3s ease"
      bg={useColorModeValue('white', 'gray.700')}
      p={5}
      borderRadius="md"
      boxShadow="md"
      role="group"
    >
      <Image
        src={image}
        alt={`Image for ${title}`}
        objectFit="contain"
        h={{ base: '180px', md: '200px' }}
        w="100%"
        borderRadius="md"
        mb={4}
      />
      <Text fontWeight="bold" fontSize="lg" color="blue.600" mb={2}>
        {title}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        By {author} • {new Date(date).toLocaleDateString()}
      </Text>
      <Stack direction="row" wrap="wrap" spacing={2} mb={3}>
        {tags.map((tag, i) => (
          <Tag key={i} colorScheme="blue">
            {tag}
          </Tag>
        ))}
      </Stack>
      <Text fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>
        {desc}
      </Text>
    </Box>
  )
}
