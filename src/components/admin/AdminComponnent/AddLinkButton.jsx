import React from 'react'
import { Link } from 'react-router-dom'

const AddLinkButton = ({ btntext, link }) => {
  return (
    <>
      <Link
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to={link}
      >
        {btntext}
      </Link>
    </>
  )
}

export default AddLinkButton
