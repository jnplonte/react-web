interface IDynamicProps {
	[key: string]: any;
}

export interface IQueryProps extends IDynamicProps {
	limit: number;
	page: number;
	order: string;
	sortBy?: string;
	sortAt?: string;
	query?: string | null;
}

export interface IFormProps {
	isValid: boolean;
	disabledValues?: string[];
	values: any;
	touched?: object;
	errors?: object;
	gridFormat?: number[];
}

export interface ICoreProps {
	id?: string | number;
	name?: string;
}
