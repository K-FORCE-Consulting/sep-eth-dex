import NotFound from '../views/NotFound'

const NotFoundPage = () => <NotFound />

NotFoundPage.chains = []

export default NotFoundPage


export async function getServerSideProps() { return { props: {} }; }

