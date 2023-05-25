import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

const fetchTasks = async (setTasks, company) => {
  const {data, error} = await supabase.from('tasks').select().eq('company', company)

  if (error) {
    toast({
      title: 'Błąd.',
      description: 'Nie można pobrać tasków.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    setTasks(null)
  }
  if (data) {
    setTasks(data)
  }
}

export default fetchTasks
