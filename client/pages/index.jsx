import buildClient from '../api/buildClient'

const Home = ({ currentUser }) => {
  return (
    <div className="container py-3">
      {currentUser && (
        <h4>Hi, {currentUser.email}</h4>
      )}
    </div>
  )
}

Home.getInitialProps = async (context) => {
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser')

  return data
}

export default Home
