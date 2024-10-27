"use client"
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAppSelector } from '../store/redux';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

type Props = {}

const GetStartbtn = (props: Props) => {
    const { isAuth } = useAppSelector((state) => state.global)
    const router = useRouter()
    const {toast} = useToast()
    function handleClick() {
        if (isAuth) {
            router.push('/dashboard')
        } else {
            toast({
                title: 'Please login to get started',
            })
      }  
    }
  return (
    <div>
      <Button className="mt-3 self-start" variant="secondary" type="button" onClick={handleClick}>
        Get Started <ArrowRight />
      </Button>
    </div>
  );
}

export default GetStartbtn