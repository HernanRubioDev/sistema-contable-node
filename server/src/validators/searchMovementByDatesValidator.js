
  const dateValidation = (dateFrom, dateTo)=>{
		const errors = {}
		switch (true) {
			case dateFrom === '':
				errors.message="Debe seleccionar una fecha de inicio."
				break;

			case dateTo === '':
				errors.message = "Debe seleccionar una fecha máxima."
				break;

			default:
				delete errors.message
				break;
		}
		return errors
	}

	module.exports={dateValidation}
