import ErrorPage from '../components/ErrorPage/ErrorPage';

const Custom404Page = () => {
  return (
    <ErrorPage
      code={404}
      reasonPhrase="Not Found"
      description="The requested page could not be found."
    />
  );
};

export default Custom404Page;
