"use client"
import { useState } from "react"
import { createNewTicket } from "../actions"


export default function NewTicketPage() {
  const [idCardNumber, setIdCardNumber] = useState<number | null>(null)
  const [selectedNumbers, setSelectedNumbers] = useState<string>('')

  const [idCardNumberError, setIdCardNumberError] = useState<string | null>(null)
  const [selectedNumbersError, setSelectedNumbersError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   
    if (!idCardNumber) {
      setIdCardNumberError('Molimo unesite broj osobne iskaznice.')
      return
    }

    if (idCardNumber.toString().length > 20) {
      setIdCardNumberError('Broj osobne iskaznice ne smije biti duži od 20 znakova.')
      return
    }

    if (!selectedNumbers) {
      setSelectedNumbersError('Molimo unesite odabrane brojeve.')
      return
    }

    const numbersArray = selectedNumbers.split(',').map(num => parseInt(num.trim(), 10))
    if (numbersArray.some(num => isNaN(num) || num < 1 || num > 40)) {
      setSelectedNumbersError('Brojevi moraju biti između 1 i 45, odvojeni zarezom.')
      return
    }

    setIdCardNumberError(null)
    setSelectedNumbersError(null)

    try {
      const data = {
        idCardNumber,
        selectedNumbers: numbersArray,
      }
      await createNewTicket(data)
      alert('Listić je uspješno uplaćen.')

      setIdCardNumber(null)
      setSelectedNumbers('')
    } catch (error) {
      console.error('Error submitting ticket:', error)
      alert('Došlo je do pogreške prilikom uplate listića.')
    }

  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold'>Uplata novog listića</h1>

      <form className='flex flex-col gap-4 mt-6' onSubmit={handleSubmit}>
        <label className='flex flex-col'>
          Unesite broj osobne iskaznice:
          <input
            type='number'
            name='idCardNumber'
            value={idCardNumber ?? ''}
            onChange={e => setIdCardNumber(parseInt(e.target.value, 10))}
            className='border border-gray-300 rounded px-2 py-1 mt-1'
            required
          />
          <span className='text-sm text-red-500'>{idCardNumberError}</span>
        </label>

        <label className='flex flex-col'>
          Unesite odabrane brojeve (odvojene zarezom):
          <input
            type='text'
            name='selectedNumbers'
            value={selectedNumbers}
            onChange={e => setSelectedNumbers(e.target.value)}
            className='border border-gray-300 rounded px-2 py-1 mt-1'
            required
          />
          <span className='text-sm text-red-500'>{selectedNumbersError}</span>
        </label>

        <button
          type='submit'
          className='bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition'
        >
          Uplati listić
        </button>
      </form>
    </div>
  )
}
