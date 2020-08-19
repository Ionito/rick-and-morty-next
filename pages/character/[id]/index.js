import Head from 'next/head'
import Link from 'next/link'
import {
  Stack,
  Heading,
  Tag,
  Box,
  Image,
  Input,
  Button,
  List,
  ListItem,
} from '@chakra-ui/core'

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`

export async function getServerSideProps({ query }) {
  const { id } = query
  const res = await fetch(`${defaultEndpoint}${id}`)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

export default function Character({ data }) {
  console.log(data)
  const { name, image, gender, status } = data
  return (
    <Stack
      bg="green.700"
      justifyItems="center"
      alignItems="center"
      p={4}
      h={'100vh'}
      spacing={4}
    >
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack p={8}>
        <Heading textAlign="center" isTruncated size="xl" color="tomato">
          {name}
        </Heading>
      </Stack>

      <Stack>
        <Image
          rounded="10px"
          borderX="4px solid tomato"
          src={image}
          alt={`image${name}`}
        />

        <div className="profile-details">
          <Heading color="tomato" pb={2} fontWeight="600">
            Character Details
          </Heading>
          <List spacing={3} styleType="none">
            <ListItem color="tomato" fontWeight="600">
              Name <Tag>{name} </Tag>
            </ListItem>
            <ListItem color="tomato" fontWeight="600">
              Status <Tag>{status} </Tag>
            </ListItem>
            <ListItem color="tomato" fontWeight="600">
              Gender <Tag>{gender} </Tag>
            </ListItem>
          </List>
        </div>
      </Stack>
      <Stack>
        <Button
          variant="outline"
          maxW="200px"
          color="tomato"
          variantColor="red"
        >
          <Link href="/">
            <a>Back to All Characters</a>
          </Link>
        </Button>
      </Stack>
    </Stack>
  )
}
