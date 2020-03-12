export interface userRegistrationFields {
	userRegistrationFields:{
		roles: rolesSchema,
		language_id: languagesSchema,
		country_id: countriesSchema,
		middlename: basicSchema,
		lastname: basicSchema,
		username: basicSchema,
		password: basicSchema,
		c_password: basicSchema,
		email: basicSchema,
		mobile: basicSchema,
		dob: dobSchema,
		gender: genderSchema,
		marital_status: marital_statusSchema,
		address: basicSchema,
		state: basicSchema,
		street: basicSchema,
		city: basicSchema,
		postal_code: basicSchema,
		parent_or_guardian_information: parent_or_guardian_informationSchema
		i_have_company: i_have_companySchema,
		promotion_id: basicSchemawithIf,
		i_have_virtual_team: basicSchemawithIf,
		services_offered: services_offeredSchema,
		industries: industriesSchema,
		company_name_partners_enterprice_developers: company_name_partners_enterprice_developersSchema,
		company_other_locations_coverage: basicSchemawithIf,
		key_areas_you_are_interested: basicSchemawithIf,
		no_of_transactions_annually_services: basicSchemawithIf,
		no_of_services_hour_per_year: basicSchemawithIf,
		products_services_promote: basicSchemawithIf
	}
}
type basicSchema = {
	title: string,
	type: string,
	optional_values: string,
	key: string
}
type basicSchemawithIf = {
	title: string,
	type: string,
	optional_values: string,
	if: {
		roles:string
	}
	key: string
}
type basicOptionalValuesSchema = {
	text: string,
	value: string
}
type rolesSchema = {
	title: string,
	type: string,
	optional_value:roleSchema[],
	key: string
}
type roleSchema = {
	guid: string,
	name: string,
	lang_code: string
}
type languagesSchema = {
	title: string,
	type: string,
	optional_values: languageSchema[],
	key: string
}
type languageSchema = {
	guid: string,
	name: string,
	lang_code: string
}
type countriesSchema = {
	title: string,
	type: string,
	optional_values: countrySchema[],
	key: string
}
type countrySchema = {
	guid: string,
	name: string,
	lang_code: string
}
type dobSchema = {
	title: string,
	type: string,
	optional_values: string,
	key: string,
	format: string
}
type genderSchema = {
	title: string,
	type: string,
	optional_values: string[],
	key: string
}
type marital_statusSchema = {
	title: string,
	type: string,
	optional_values: basicOptionalValuesSchema[],
	key: string
}
type parent_or_guardian_informationSchema = {
	title: string,
	type: string,
	if: parent_or_guardian_information_ifSchema
	fields: parent_or_guardian_information_fieldsSchema,
	key: string
}
type parent_or_guardian_information_ifSchema = {
	is_minor: boolean
}
type parent_or_guardian_information_fieldsSchema = {
	guardian_firstname: basicSchema,
	guardian_lastname: basicSchema,
	guardian_email: basicSchema,
	guardian_mobile: basicSchema
	school: parent_or_guardian_information_schoolSchema
}
type parent_or_guardian_information_schoolSchema = {
	title: string,
	type: string,
	fields: parent_or_guardian_information_school_fieldsSchema,
	key:string
}
type parent_or_guardian_information_school_fieldsSchema = {
	highest_school_attended: basicSchema,
	school_name: basicSchema,
	school_start_year: basicSchema,
	school_end_year: basicSchema,
	emergency_contact: parent_or_guardian_information_school_fields_emergency_contactSchema
}
type parent_or_guardian_information_school_fields_emergency_contactSchema = {
	title: string,
	type: string,
	fields: parent_or_guardian_information_school_fields_emergency_contact_fieldsSchema
}
type parent_or_guardian_information_school_fields_emergency_contact_fieldsSchema = {
	emergency_contact_firstname: basicSchema,
	emergency_contact_lastname: basicSchema,
	emergency_contact_email: basicSchema,
	emergency_contact_mobile: basicSchema,
}
type i_have_companySchema = {
	title: string,
	type: string,
	optional_values: basicOptionalValuesSchema[],
	key: string,
	if: i_have_company_ifSchema,

}
type i_have_company_ifSchema = {
	i_have_company: boolean
}
type i_have_company_fieldsSchema = {
	company_name: basicSchema,
	company_city: basicSchema,
	company_address: basicSchema,
	company_country: countriesSchema,
	company_state: basicSchema
	company_postal_code: basicSchema
	company_website: basicSchema
	company_contact_details: basicSchema
	company_people_count: basicSchema

}
type services_offeredSchema = {
	title: string[],
	type: string,
	optional_values: string,
	if: {
		roles:string
	}
	key: string
}
type industriesSchema = {
	title: string,
	type: string,
	optional_values: string,
	if: {
		roles:string[]
	}
	fields: industries_fieldsSchema,
	key: string
}
type industries_fieldsSchema = {
	net_worth: basicSchema,
	income: basicSchema,
	liquidated_assets: basicSchema,
	how_much_are_you_willing_to_invest: basicSchema,
	preference_model_of_investment: basicSchema,
	preference_for_contact: basicSchema,
}
type company_name_partners_enterprice_developersSchema = {
	title: string,
	type: string,
	if: {
		roles:string[]
	}
	fields: company_name_partners_enterprice_developers_fieldsSchema,
	key: string
}
type company_name_partners_enterprice_developers_fieldsSchema = {
	company_abstract: basicSchema,
	company_hq_address: basicSchema,
	company_size: basicSchema,
	company_revenue: basicSchema,
	key_customer_size_in_revenue: basicSchema,
	key_customer_size_in_employees: basicSchema,
	key_technologies: basicSchema,
	key_industries: basicSchema,
}