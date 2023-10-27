import styled from "styled-components";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;



export default function TodayItem({activity}) {
 
  const {status,guests,numNights} = activity;
  return (
    <StyledTodayItem>
      {status==="unconfirmed" && (
        <span className="bg-green-600 rounded-full h-3 w-3">Arriving</span>
      )}
      {status==="checked-in" && (
        <span className="bg-blue-600 rounded-full h-3 w-3">Departing</span>
      )}
      <Guest>{guests.name}</Guest>
      <div>{numNights} nights</div>

    </StyledTodayItem>
  )
}
