import { useState, useCallback, useEffect } from 'react'
import { getErrorMessage } from '../services/api'

/**
 * Custom hook for async API calls
 * Handles loading, error, and data states
 * @param {Function} apiCall - The API call function
 * @param {Array} dependencies - Dependencies for useCallback
 * @returns {Object} { data, loading, error, execute }
 */
export const useApiCall = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiCall(...args)
        setData(response.data)
        return response.data
      } catch (err) {
        const errorMsg = getErrorMessage(err)
        setError(errorMsg)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiCall, ...dependencies]
  )

  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}

/**
 * Custom hook for fetching data on component mount
 * @param {Function} apiCall - The API call function to fetch data
 * @param {Array} dependencies - Dependencies array for refetching
 * @param {boolean} skip - Skip initial fetch if true
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (apiCall, dependencies = [], skip = false) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      setData(response.data)
      return response.data
    } catch (err) {
      const errorMsg = getErrorMessage(err)
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  // Fetch on mount and when dependencies change
  useEffect(() => {
    if (!skip) {
      refetch()
    }
  }, [refetch, skip, ...dependencies])

  return {
    data,
    loading,
    error,
    refetch,
  }
}

/**
 * Custom hook for form submission with API call
 * Handles loading, error, and success states
 * @param {Function} apiCall - The API call function
 * @param {Function} onSuccess - Callback on success
 * @param {Function} onError - Callback on error
 * @returns {Object} { loading, error, submit }
 */
export const useSubmit = (apiCall, onSuccess, onError) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiCall(data)
        onSuccess?.(response.data)
        return response.data
      } catch (err) {
        const errorMsg = getErrorMessage(err)
        setError(errorMsg)
        onError?.(errorMsg)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiCall, onSuccess, onError]
  )

  return {
    loading,
    error,
    submit,
  }
}

/**
 * Custom hook for managing form state with validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Submit handler
 * @returns {Object} Form state and handlers
 */
export const useFormWithValidation = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        setLoading(true)
        await onSubmit(values)
        setValues(initialValues)
        setTouched({})
      } catch (err) {
        console.error('Form submission error:', err)
      } finally {
        setLoading(false)
      }
    },
    [values, initialValues, onSubmit]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors,
  }
}
