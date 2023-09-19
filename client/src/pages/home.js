import React, { useEffect } from 'react'
import Lottie from 'lottie-react'
import h from '../animation/h.json'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'))
        console.log(user)
        if (user) {
            if (user.TypeId == 1) {
                navigate('/studentDashboard')
            } else if (user.TypeId == 3) {
                navigate('/facultyDashboard')
            } else if (user.TypeId == 2) {
                navigate('/instituteDashboard')
            }
        }
    }, [])
    return <>
        <div className='flex'>
            <Lottie animationData={h} className='h-[650px] w-[650px]' />

            <section class="bg-center bg-no-repeat bg-[url('/src/images/school.jpeg')] 
bg-gradient-to-t from-gray-600 to-red-800 bg-blend-darken">
                <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">AICTE</h1>
                    <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, beatae nihil officiis modi aliquid dolore dicta aperiam necessitatibus sed eveniet ipsam debitis velit non, ab ut magnam, excepturi quam quasi! </p>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a href="/login" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-red-700">
                            Get started
                            <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                        <a href="/" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                            Learn more
                        </a>
                    </div>
                </div>
            </section>

        </div>
    </>
}

export default Home