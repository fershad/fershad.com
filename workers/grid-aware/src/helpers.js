export function setResponseHeaders(resp, gridData) {
	let response;
	// If the response is a string or has no body property, convert it to a Response object
	if (typeof resp !== 'object') {
	  response = new Response(resp);
	} else {
	  response = resp.clone();
	}

	if (gridData?.status === "error") {
	  response.headers.append("GAW-Status", "error")
	  response.headers.append("GAW-Error", gridData.message)

	  return response
	}

	response.headers.append("GAW-Grid-Aware", gridData.gridAware.toString());
	response.headers.append("GAW-Region", gridData.region);

	if(gridData.gridAware) {
	  if(gridData.data.mode === "renewable") {
		response.headers.append("GAW-Mode", "renewable");
		response.headers.append("GAW-Percentage", gridData.data.renewablePercentage.toString());
		response.headers.append("GAW-Minimum", gridData.data.minimumPercentage.toString());
	  } else if (gridData.data.mode === "lowcarbon") {
		response.headers.append("GAW-Mode", "low carbon");
		response.headers.append("GAW-Percentage", gridData.data.lowCarbonPercentage.toString());
		response.headers.append("GAW-Minimum", gridData.data.minimumPercentage.toString());
	  } else if (gridData.data.mode === "average") {
		response.headers.append("GAW-Mode", "carbon intensity - average");
		response.headers.append("GAW-Current-Intensity", gridData.data.carbonIntensity.toString());
		response.headers.append("GAW-Average-Intensity", gridData.data.averageIntensity.toString());
	  } else if (gridData.data.mode === "limit") {
		response.headers.append("GAW-Mode", "carbon intensity - limit");
		response.headers.append("GAW-Current-Intensity", gridData.data.carbonIntensity.toString());
		response.headers.append("GAW-Minimum-Intensity", gridData.data.minimumIntensity.toString());
	  }
	}

	return response;
  }
