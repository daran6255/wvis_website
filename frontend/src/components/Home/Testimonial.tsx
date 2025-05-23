'use client'

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

const Testimonial = (props: Props) => {
  const { children } = props
  return <Box as="article" role="group" aria-roledescription="testimonial">{children}</Box>
}

const TestimonialContent = (props: Props) => {
  const { children } = props

  return (
    <Stack
      as="blockquote"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  )
}

const TestimonialHeading = (props: Props) => {
  const { children } = props
  return (
    <Heading
      as="h3"
      fontSize={'xl'}
      id="testimonial-title"
      tabIndex={0}
    >
      {children}
    </Heading>
  )
}

const TestimonialText = (props: Props) => {
  const { children } = props
  return (
    <Text
      as="p"
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
    >
      {children}
    </Text>
  )
}

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string
  name: string
  title: string
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} name={name} mb={2} role="img" aria-label={`Photo of ${name}`} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  )
}

export default function WithSpeechBubbles() {
  return (
    <Box
      as="section"
      aria-labelledby="clients-heading"
      bg={useColorModeValue('gray.100', 'gray.700')}
      role="region"
    >
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading id="clients-heading" as="h2">
            Our Clients Speak
          </Heading>
          <Text>
            We have been working with clients around the world
          </Text>
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Data-Driven Insights</TestimonialHeading>
              <TestimonialText>
                We collaborated with them to implement Power BI dashboards integrated with Google Sheets automation, streamlining our decision-making process and saving hours of manual work.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={'/assets/latha.jpg'}
              name={'Latha Srinivasan'}
              title={'CEO at Chippersage'}
            />
          </Testimonial>

          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Seamless Mobile Experience</TestimonialHeading>
              <TestimonialText>
                The mobile application they developed for us exceeded our expectations — modern, user-friendly, and perfectly tailored for our needs. Excellent communication throughout the process.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={'/assets/chaithanya.jpg'}
              name={'Chaithanya'}
              title={'CEO at Yunikee'}
            />
          </Testimonial>

          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Accounts Automation Excellence</TestimonialHeading>
              <TestimonialText>
                They automated our complete accounting workflow with Zoho Books, reducing human errors and giving us real-time financial visibility. A truly professional and skilled team.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={'/assets/sunil.jpg'}
              name={'Sunil'}
              title={'CEO at Eyris Solution'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  )
}
