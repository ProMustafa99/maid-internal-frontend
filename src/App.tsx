
export default function App() {
  return (
    <div className=''>
       <h1 className='text-2xl font-bold text-blue-500 bg-red-500'>App</h1>
       <button className='bg-blue-500 text-white p-2 rounded-md'>Click me</button>
       <input type='text' className='border-2 border-gray-300 rounded-md p-2' />
       <select className='border-2 border-gray-300 rounded-md p-2'>
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
        <option value='3'>Option 3</option>
       </select>
       <textarea className='border-2 border-gray-300 rounded-md p-2' />
       <div className='flex flex-col gap-2'>
        <input type='checkbox' className='border-2 border-gray-300 rounded-md p-2 bg-slate-50' />
        <input type='radio' className='border-2 border-gray-300 rounded-md p-2' />
       </div>
       <div className='flex flex-col gap-2'>
        <input type='date' className='border-2 border-gray-300 rounded-md p-2' />
        <input type='time' className='border-2 border-gray-300 rounded-md p-2' />
       </div>
    </div>
  );
}
