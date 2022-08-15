import './Error.scss';

interface ErrorProps {
  message: string;
  title?: string;
}

const Error = ({ message, title }: ErrorProps) => {
  return (
    <div className="Error">
      <div className="Error-inner">
        {title && <h2 className="Error-title">{title}</h2>}
        <div className="Error-message">{message}</div>
      </div>
    </div>
  );
};

export default Error;
