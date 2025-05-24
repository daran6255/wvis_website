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
  Spinner,
  Center,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useEffect, useState } from 'react'
import { getAllBlogs } from '../helpers/blog_services'
import { Blog as BlogType } from '../helpers/model'

export default function Blog() {
  const [blogData, setBlogData] = useState<BlogType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getAllBlogs()
        setBlogData(blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

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

          {featured ? (
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={10}
              align="flex-start"
              // bg={useColorModeValue('gray.50', 'gray.700')}
              p={8}
              rounded="xl"
              boxShadow="md"
              wrap="wrap"
            >
              <Link to={`/blogs/${featured.id}`} aria-label={`Read featured blog: ${featured.title}`}>
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
                  {featured.title}
                  <Badge colorScheme="red" fontSize="0.4em" ml={5} px={2} py={1} borderRadius="md">NEW</Badge>
                </Heading>
                <Text color="gray.600">{featured.description}</Text>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  By {featured.author} • {new Date(featured.created_at).toLocaleDateString()}
                </Text>
                <Stack direction="row" spacing={2} mb={3}>
                  {featured.tags.map((tag, i) => (
                    <Tag key={i} colorScheme="blue">
                      {tag}
                    </Tag>
                  ))}
                </Stack>
                <ChakraLink as={Link} to={`/blogs/${featured.id}`} color="blue.500" fontWeight="bold">
                  Read Full Blog →
                </ChakraLink>
              </Stack>
            </Flex>
          ) : (
            <Text>No featured blog available.</Text>
          )}
        </Container>
      </Box>

      {/* All Blogs */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="6xl">
          <Heading fontSize="2xl" mb={10}>
            More Articles
          </Heading>
          {loading ? (
            <Center>
              <Spinner size="lg" />
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
              {blogData.map((item) => (
                <BlogCard key={item.id} {...item} />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  )
}

// 🔖 Blog Card Component
const BlogCard = ({
  id,
  title,
  image,
  tags,
  description,
  created_at,
  author,
}: BlogType) => {
  return (
    <Box
      as={Link}
      to={`/blogs/${id}`}
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
        By {author} • {new Date(created_at).toLocaleDateString()}
      </Text>
      <Stack direction="row" wrap="wrap" spacing={2} mb={3}>
        {tags.map((tag, i) => (
          <Tag key={i} colorScheme="blue">
            {tag}
          </Tag>
        ))}
      </Stack>
      <Text fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>
        {description}
      </Text>
    </Box>
  )
}
