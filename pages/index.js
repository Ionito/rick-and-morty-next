import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  Stack,
  Heading,
  SimpleGrid,
  Box,
  Image,
  Input,
  Button,
} from '@chakra-ui/core'

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

export default function Home({ data }) {
  const { info, results: defaultResults = [] } = data
  const [results, updateResults] = useState(defaultResults)
  const [page, updatePage] = useState({ ...info, current: defaultEndpoint })
  const queryInput = useRef(null)

  const { current } = page

  useEffect(() => {
    if (current === defaultEndpoint) return

    async function request() {
      const res = await fetch(current)
      const nextData = await res.json()
      updatePage({
        current,
        ...nextData.info,
      })
      if (!nextData.info?.prev) {
        updateResults(nextData.results)
        return
      }
      updateResults((prev) => {
        return [...prev, ...nextData.results]
      })
    }

    request()
  }, [current])

  const handleLoadMore = () => {
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next,
      }
    })
  }

  const handleOnSubmitSearch = (e) => {
    e && e.preventDefault()

    const value = queryInput.current.value || ''
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`

    updatePage({ current: endpoint })
  }

  const keyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleOnSubmitSearch()
    }
  }

  return (
    <Stack bg="green.700" p={4}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack
        bg="green.200"
        rounded="10px"
        isInline
        justifyContent="space-between"
      >
        <Stack p={8}>
          <Heading size={['xl']} color="tomato">
            Wubba Lubba Dub Dub!
          </Heading>
          <p>Rick and Morty Character Wiki</p>
        </Stack>
        <Stack justifyContent="flex-end" pr={4}>
          <Image src="/rick.png" maxW="150px" objectFit="cover" />
        </Stack>
      </Stack>

      <Stack p="4" justifyContent="center" isInline>
        <Input
          name="query"
          type="search"
          focusBorderColor="pink.400"
          color="gray.900"
          borderX="2px solid tomato"
          bg="green.300"
          rounded="10px"
          fontWeight="800"
          px="4"
          py="2"
          variant="unstyled"
          ref={queryInput}
          maxW="400px"
          onKeyUp={keyUp}
        />
        <Button
          variant="outline"
          color="tomato"
          variantColor="red"
          onClick={handleOnSubmitSearch}
        >
          Search
        </Button>
      </Stack>

      <SimpleGrid minChildWidth="320px" spacing={5} py={4} px={8}>
        {results?.map((result) => {
          const { id, name, image } = result
          return (
            <Box
              key={id}
              bg="green.200"
              py="4"
              rounded="20px"
              borderX="4px solid tomato"
            >
              <Link href={`/character/${id}`}>
                <a>
                  <Heading
                    as="h3"
                    py={2}
                    mx="auto"
                    size="md"
                    color="tomato"
                    textAlign="center"
                  >
                    {name}
                  </Heading>

                  <Image
                    size="300px"
                    rounded="20px"
                    border="1px solid #444"
                    mx="auto"
                    src={image}
                    alt={`${name} Thumbnail`}
                  />
                </a>
              </Link>
            </Box>
          )
        })}
      </SimpleGrid>
      <Stack alignItems="center">
        <Button
          variant="outline"
          maxW="200px"
          color="tomato"
          variantColor="red"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      </Stack>
    </Stack>
  )
}
