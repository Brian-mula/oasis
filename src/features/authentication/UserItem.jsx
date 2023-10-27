

export default function UserItem({guest}) {
  return (
    <>
    <p className="">{guest.name}</p>
    <p>{guest.email}</p>
    <p>{guest.nationality}</p>
    <p>{guest.nationalId}</p>
    
    </>
  )
}
