export default function Pages({ goToNext, goToPrev }) {
    return (
      <div className="pages">
        {goToPrev ? (
          <button onClick={goToPrev}>PREV</button>
        ) : (
          <button disabled>PREV</button>
        )}
        {goToNext ? (
          <button onClick={goToNext}>NEXT</button>
        ) : (
          <button disabled>Next</button>
        )}
      </div>
    );
  }