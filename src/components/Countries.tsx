import Error from './Error';
import PageSpinner from './PageSpinner';
import useQuery from '../hooks/useQuery';
import graphql from '../graphql';
import './Countries.scss';

interface CountriesQuery {
  countries: { name: string; code: string }[];
}

const QUERY = graphql`
  query CountriesQuery {
    countries {
      name
      code
    }
  }
`;

const Countries = () => {
  const { data, error, status } = useQuery<CountriesQuery>(QUERY);

  if (status === useQuery.STATUS.LOADING) {
    return <PageSpinner />;
  }

  if (status === useQuery.STATUS.ERROR) {
    return <Error title="Something went wrong" message={error.message} />;
  }

  return (
    <ul className="Countries">
      {data.countries.map((country) => (
        <li className="Countries-country" key={country.code}>
          {country.code} - {country.name}
        </li>
      ))}
    </ul>
  );
};

export default Countries;
