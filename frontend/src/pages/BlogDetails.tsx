import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Stack,
  Tag,
  Spinner,
  Center,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { getBlogById } from '../helpers/blog_services'
import { Blog } from '../helpers/model'

export default function BlogDetails() {
  const { id } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Move hooks outside conditional rendering
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id || '')
        setBlog(data)
      } catch {
        setError('Blog not found.')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchBlog()
  }, [id])

  return (
    <>
      <Navbar />
      <Box bg={bgColor} py={10} mt={{ base: 20, md: 20 }} minH="80vh">
        <Container maxW="5xl">
          {loading ? (
            <Center h="50vh">
              <Spinner size="xl" />
            </Center>
          ) : error ? (
            <Center>
              <Text color="red.500" fontSize="xl">{error}</Text>
            </Center>
          ) : blog ? (
            <Stack spacing={8}>
              <Image
                src={blog.image}
                alt={blog.title}
                borderRadius="md"
                objectFit="cover"
                w="100%"
                maxH="400px"
                boxShadow="lg"
              />

              <Heading size="2xl">{blog.title}</Heading>

              <Text color="gray.600" fontSize="sm">
                By {blog.author} • {new Date(blog.created_at).toLocaleDateString()}
              </Text>

              <Stack direction="row" wrap="wrap" spacing={3}>
                {blog.tags.map((tag, i) => (
                  <Tag key={i} colorScheme="blue">
                    {tag}
                  </Tag>
                ))}
              </Stack>

              <Divider />

              <Text color={textColor} fontSize="md" lineHeight="tall">
                {blog.description}
              </Text>
            </Stack>
          ) : null}
        </Container>
      </Box>
      <Footer />
    </>
  )
}
