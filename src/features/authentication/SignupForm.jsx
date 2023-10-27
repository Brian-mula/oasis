
import BackButton from '../../ui/BackButton';
import Loaded from '../../ui/Loaded';
import { useGuests } from '../guests/useGuests';
import CreateUserForm from './CreateUserForm';
import UserItem from './UserItem';

export default function SignupForm() {
  const {guests,isLoading} = useGuests();

  if(isLoading) return <Loaded/>
  return (
    <div>
      <div className='flex justify-between items-start my-3'>
        <BackButton/>

        <CreateUserForm/>
      </div>
      <div className='bg-base-200 p-2 rounded-sm'>
      <div className='grid grid-cols-4 gap-x-4 gap-y-7 shadow-sm pb-2 '>
        <div className='font-bold'>Full Name</div>
        <div className='font-bold'>Email</div>
        <div className='font-bold'>Nationality</div>
        <div className='font-bold'>National Id</div>

      </div>
      <div className='grid grid-cols-4 gap-x-5 gap-y-4 pt-2'>
      {
        guests.map((guest)=>(
          <UserItem key={guest.id} guest={guest}/>
        ))
      }
      </div>
      </div>
    </div>
  )
}
