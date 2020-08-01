import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/Home.module.css'

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
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{name}</h1>
        <div className="profile">
          <div className="profile-img">
            <img src={image} alt={`image${name}`} />
          </div>
          <div className="profile-details">
            <h2>Character Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> {name}
              </li>
              <li>
                <strong>Status:</strong> {status}
              </li>
              <li>
                <strong>Gender:</strong> {gender}
              </li>
            </ul>
          </div>
        </div>
        <p className="back">
          <Link href="/">
            <a>Back to All Characters</a>
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
