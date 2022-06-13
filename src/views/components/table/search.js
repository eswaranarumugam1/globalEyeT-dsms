
/* eslint-disable */
import { useState } from 'react'
import './style.scss'
import { FiX } from "react-icons/fi"
import { AiOutlineSearch } from "react-icons/ai"

export const SearchComponent = (props) => {
    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState(false)
    const [typing, setTyping] = useState(false)

    // Submit Form
    const onSubmit = event => {
        event.preventDefault()
        if (!inputValue) {
            return setError(true)
        }

        props.search(inputValue)
    }

    // handle clear
    const onClear = () => {
        setInputValue("")
        setError(false)
        setTyping(false)
        props.clear()
    }

    return (
        <div className="search-component">
            <form onSubmit={onSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder={props.placeholder}
                        className={error ? "form-control form-control-sm shadow-none error" : "form-control form-control-sm shadow-none"}
                        value={inputValue}
                        onChange={event => {
                            setTyping(true)
                            setInputValue(event.target.value)
                        }}
                    />

                    {/* Loader button */}
                    {props.searchLoading && inputValue && typing ?
                        <button type="button" className="btn btn-sm shadow-none" disabled>
                            <div className="btn-loader" />
                        </button>
                        : null
                    }

                    {/* Clear button */}
                    {!props.searchLoading && inputValue && typing ?
                        <button type="button" className="btn btn-sm shadow-none" onClick={onClear}>
                            <FiX size={20} />
                        </button>
                        : null
                    }
                </div>
            </form>
        </div>
    )
}

