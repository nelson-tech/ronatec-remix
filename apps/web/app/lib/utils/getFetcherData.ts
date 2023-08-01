type FetcherSubmissionData = {
  json: any
  formData: FormData | null
  text: string | null
}

const getFetcherData = async (
  request: Request
): Promise<FetcherSubmissionData> => {
  let type = request.headers.get("Content-Type")

  const data: FetcherSubmissionData = { json: null, formData: null, text: null }

  // the payload is serialized into the request body now
  switch (type) {
    case "application/json": {
      data.json = await request.json()
      break
    }

    case "text/plain": {
      data.text = await request.text()
      break
    }

    default: {
      data.formData = await request.formData()
      break
    }
  }

  return data
}

export default getFetcherData
