
import BackButton from '../../ui/BackButton'
import CreateUserForm from './CreateUserForm'

export default function SignupForm() {
  return (
    <div>
      <div className='flex justify-between items-start my-3'>
        <BackButton/>

        <CreateUserForm/>
      </div>
    </div>
  )
}
