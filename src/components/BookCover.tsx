export interface BookCoverProps {
  backgroundImage: string;
}

const BookCover = ({ backgroundImage }: BookCoverProps) => {
  return (
    <div
      className="book-cover"
      style={{
        width: 128,
        height: 193,
        backgroundImage: `url(${backgroundImage})`,
      }}
    ></div>
  );
};

export default BookCover;
