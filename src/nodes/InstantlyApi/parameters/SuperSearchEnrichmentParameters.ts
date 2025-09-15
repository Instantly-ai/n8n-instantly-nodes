import { INodeProperties } from 'n8n-workflow';

/**
 * SuperSearch Enrichment Parameters
 * NEW FEATURE: Added September 4, 2025
 *
 * Provides comprehensive lead enrichment with AI-powered personalization
 */
export const superSearchEnrichmentParameters: INodeProperties[] = [
	// SUPERSEARCH ENRICHMENT OPERATIONS
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
			},
		},
		options: [
			{
				name: 'Create SuperSearch Enrichment',
				value: 'create',
				description: 'Create a new SuperSearch enrichment with search criteria and enrichment settings',
				action: 'Create a SuperSearch enrichment',
			},
			{
				name: 'Get SuperSearch Enrichment',
				value: 'get',
				description: 'Get SuperSearch enrichment details and status by resource ID',
				action: 'Get a SuperSearch enrichment',
			},
			{
				name: 'Run SuperSearch Enrichment',
				value: 'run',
				description: 'Execute enrichment for specific leads or all unenriched leads',
				action: 'Run a SuperSearch enrichment',
			},
			{
				name: 'Add SuperSearch Enrichment to Resource',
				value: 'addToResource',
				description: 'Add enrichment results to a campaign or lead list',
				action: 'Add SuperSearch enrichment to resource',
			},
			{
				name: 'Create AI Personalization',
				value: 'runAiEnrichment',
				description: 'Run AI-powered personalization on existing leads with custom prompts',
				action: 'Create AI personalization',
			},
			{
				name: 'Get Enrichment History',
				value: 'getHistory',
				description: 'Get enrichment history and audit trail for a resource',
				action: 'Get enrichment history',
			},
		],
		default: 'create',
	},

	// CREATE ENRICHMENT PARAMETERS
	{
		displayName: 'Enrichment Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'My SuperSearch Enrichment',
		description: 'Name for the SuperSearch enrichment',
	},

	// REQUIRED RESOURCE PARAMETERS
	{
		displayName: 'Resource ID',
		name: 'resourceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: '01234567-89ab-cdef-0123-456789abcdef',
		description: 'UUID of the campaign or list to enrich leads into (required by Instantly API)',
	},
	{
		displayName: 'Resource Type',
		name: 'resourceType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Campaign',
				value: 1,
			},
			{
				name: 'List',
				value: 2,
			},
		],
		default: 1,
		description: 'Type of resource to enrich leads into (required by Instantly API)',
	},

	// SEARCH FILTERS
	{
		displayName: 'Search Filters',
		name: 'searchFilters',
		type: 'collection',
		placeholder: 'Add Search Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				placeholder: 'San Francisco, CA',
				description: 'Geographic location to search (city, state, country)',
			},
			{
				displayName: 'Job Titles',
				name: 'jobTitles',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				placeholder: 'CEO, Founder, Marketing Director',
				description: 'Job titles to target',
			},
			{
				displayName: 'Companies',
				name: 'companies',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				placeholder: 'Google, Microsoft, Apple',
				description: 'Specific companies to target',
			},
			{
				displayName: 'Industries',
				name: 'industries',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				placeholder: 'Technology, Healthcare, Finance',
				description: 'Industries to target',
			},
		],
	},

	// ENRICHMENT SETTINGS
	{
		displayName: 'Enrichment Settings',
		name: 'enrichmentSettings',
		type: 'collection',
		placeholder: 'Add Enrichment Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Enable Waterfall Enrichment',
				name: 'enableWaterfallEnrichment',
				type: 'boolean',
				default: true,
				description: 'Whether to use multiple data providers for better coverage',
			},
			{
				displayName: 'Enable AI Enrichment',
				name: 'enableAiEnrichment',
				type: 'boolean',
				default: false,
				description: 'Whether to use AI for personalization and insights',
			},
			{
				displayName: 'AI Model',
				name: 'aiModel',
				type: 'options',
				displayOptions: {
					show: {
						enableAiEnrichment: [true],
					},
				},
				options: [
					{
						name: 'GPT-4o',
						value: 'gpt-4o',
					},
					{
						name: 'GPT-5',
						value: 'gpt-5',
					},
					{
						name: 'Claude 3.5 Sonnet',
						value: 'claude-3-5-sonnet',
					},
					{
						name: 'Claude 3 Opus',
						value: 'claude-3-opus',
					},
					{
						name: 'DeepSeek',
						value: 'deepseek',
					},
				],
				default: 'gpt-4o',
				description: 'AI model to use for enrichment',
			},
			{
				displayName: 'AI Prompt',
				name: 'aiPrompt',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						enableAiEnrichment: [true],
					},
				},
				default: '',
				placeholder: 'Write a personalized opening line based on the lead\'s company and role...',
				description: 'Custom AI prompt for personalization',
			},
		],
	},

	// ADDITIONAL FIELDS FOR CREATE
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Max Results',
				name: 'maxResults',
				type: 'number',
				default: 1000,
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
				description: 'Maximum number of leads to find',
			},
			{
				displayName: 'Enable Email Verification',
				name: 'enableEmailVerification',
				type: 'boolean',
				default: true,
				description: 'Whether to verify email addresses',
			},
			{
				displayName: 'Enable Company Intelligence',
				name: 'enableCompanyIntelligence',
				type: 'boolean',
				default: false,
				description: 'Whether to gather company intelligence (funding, news, etc.)',
			},

			{
				displayName: 'List Name',
				name: 'listName',
				type: 'string',
				default: '',
				placeholder: 'My SuperSearch List',
				description: 'Custom name for the list created during enrichment',
			},
			{
				displayName: 'Auto Update',
				name: 'autoUpdate',
				type: 'boolean',
				default: true,
				description: 'Whether new leads added to the resource will be automatically enriched',
			},
			{
				displayName: 'Skip Rows Without Email',
				name: 'skipRowsWithoutEmail',
				type: 'boolean',
				default: true,
				description: 'Whether to skip enrichment for leads without email addresses',
			},
		],
	},

	// RESOURCE ID PARAMETER (for get, run, addToResource, getHistory)
	{
		displayName: 'Resource ID',
		name: 'resourceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['get', 'run', 'addToResource', 'getHistory'],
			},
		},
		default: '',
		description: 'The SuperSearch enrichment resource ID',
	},

	// RUN SETTINGS
	{
		displayName: 'Run Settings',
		name: 'runSettings',
		type: 'collection',
		placeholder: 'Add Run Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['run'],
			},
		},
		options: [
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 'low',
					},
					{
						name: 'Normal',
						value: 'normal',
					},
					{
						name: 'High',
						value: 'high',
					},
				],
				default: 'normal',
				description: 'Processing priority for the enrichment job',
			},
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
				placeholder: 'https://your-webhook-url.com/callback',
				description: 'URL to receive completion notification',
			},
		],
	},



	// AI PERSONALIZATION PARAMETERS
	{
		displayName: 'Resource',
		name: 'resourceId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['runAiEnrichment'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a resource...',
				typeOptions: {
					searchListMethod: 'getResources',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 01234567-89ab-cdef-0123-456789abcdef',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
							errorMessage: 'Please enter a valid UUID',
						},
					},
				],
			},
		],
		description: 'The campaign or list resource containing leads to personalize',
	},

	{
		displayName: 'Output Column',
		name: 'outputColumn',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['runAiEnrichment'],
			},
		},
		default: 'ai_personalization',
		placeholder: 'ai_personalization',
		description: 'Column name where AI personalization results will be stored',
	},

	{
		displayName: 'Resource Type',
		name: 'resourceType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['runAiEnrichment'],
			},
		},
		options: [
			{
				name: 'Campaign',
				value: 1,
			},
			{
				name: 'List',
				value: 2,
			},
		],
		default: 1,
		description: 'Type of resource (Campaign=1, List=2)',
	},

	{
		displayName: 'AI Model',
		name: 'modelVersion',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['runAiEnrichment'],
			},
		},
		options: [
			{
				name: 'GPT-4o (Recommended)',
				value: 'gpt-4o',
				description: 'Latest GPT-4 model with improved reasoning and speed',
			},
			{
				name: 'GPT-4o Mini',
				value: 'gpt-4o-mini',
				description: 'Faster, cost-effective version of GPT-4o',
			},
			{
				name: 'GPT-4 Turbo',
				value: 'gpt-4-turbo',
				description: 'Previous generation GPT-4 with large context window',
			},
			{
				name: 'Claude 3.5 Sonnet',
				value: 'claude-3-5-sonnet-20241022',
				description: 'Anthropic\'s most capable model for complex reasoning',
			},
			{
				name: 'Claude 3.5 Haiku',
				value: 'claude-3-5-haiku-20241022',
				description: 'Fast and efficient Claude model for simple tasks',
			},
			{
				name: 'Claude 3 Opus',
				value: 'claude-3-opus-20240229',
				description: 'Anthropic\'s most powerful model for complex tasks',
			},
		],
		default: 'gpt-4o',
		description: 'AI model to use for personalization. GPT-4o recommended for best results.',
	},

	{
		displayName: 'AI Prompt',
		name: 'prompt',
		type: 'string',
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['runAiEnrichment'],
			},
		},
		default: 'Write a personalized opening line for {{first_name}} {{last_name}} who works as {{job_title}} at {{company_name}}. Use their company information and recent news to create a relevant, engaging message.',
		placeholder: 'Write a personalized opening line for {{first_name}} {{last_name}} who works as {{job_title}} at {{company_name}}...',
		description: 'AI prompt template for personalization. Use {{field_name}} placeholders for lead data fields like {{first_name}}, {{company_name}}, {{job_title}}, etc.',
	},

	// AI PERSONALIZATION ADDITIONAL SETTINGS
	{
		displayName: 'Additional Settings',
		name: 'additionalSettings',
		type: 'collection',
		placeholder: 'Add AI Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['runAiEnrichment'],
			},
		},
		options: [
			{
				displayName: 'Input Columns',
				name: 'inputColumns',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				placeholder: 'first_name, company_name, job_title',
				description: 'Specific lead data columns to include in AI personalization (leave empty to use all available data)',
			},
			{
				displayName: 'Use Instantly Account',
				name: 'useInstantlyAccount',
				type: 'boolean',
				default: true,
				description: 'Whether to use your Instantly account data for enhanced personalization',
			},
			{
				displayName: 'Overwrite Existing',
				name: 'overwrite',
				type: 'boolean',
				default: false,
				description: 'Whether to overwrite existing AI personalization data',
			},
			{
				displayName: 'Auto Update',
				name: 'autoUpdate',
				type: 'boolean',
				default: true,
				description: 'Automatically personalize new leads added to the resource',
			},
			{
				displayName: 'Skip Leads Without Email',
				name: 'skipLeadsWithoutEmail',
				type: 'boolean',
				default: true,
				description: 'Skip personalization for leads without email addresses',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
				description: 'Maximum number of leads to personalize in this batch',
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				placeholder: 'template_123',
				description: 'Optional: Use a predefined AI personalization template',
			},
		],
	},

	// PAGINATION PARAMETERS FOR HISTORY
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['getHistory'],
			},
		},
		description: 'Whether to return all enrichment history or limit results',
	},

	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['getHistory'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of enrichment history records to return (max 100)',
	},

	// RESOURCE LOCATOR PARAMETERS FOR OPERATIONS REQUIRING RESOURCE_ID
	{
		displayName: 'Resource',
		name: 'resourceId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['get', 'addToResource', 'getHistory'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a resource...',
				typeOptions: {
					searchListMethod: 'getResources',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 01234567-89ab-cdef-0123-456789abcdef',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
							errorMessage: 'Please enter a valid UUID',
						},
					},
				],
			},
		],
		description: 'The campaign or list resource to work with',
	},

	{
		displayName: 'Enrichment ID',
		name: 'enrichmentId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['run'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select an enrichment...',
				typeOptions: {
					searchListMethod: 'getEnrichments',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 01234567-89ab-cdef-0123-456789abcdef',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
							errorMessage: 'Please enter a valid UUID',
						},
					},
				],
			},
		],
		description: 'The enrichment to execute',
	},

	// GET SUPERSEARCH ENRICHMENT ADDITIONAL OPTIONS
	{
		displayName: 'Get All Enrichments',
		name: 'getAllEnrichments',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['get'],
			},
		},
		description: 'Whether to retrieve comprehensive enrichment results',
	},

	// ADD SUPERSEARCH ENRICHMENT TO RESOURCE PARAMETERS
	{
		displayName: 'Enrichment Types',
		name: 'enrichmentTypes',
		type: 'collection',
		placeholder: 'Add Enrichment Type',
		default: {},
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['addToResource'],
			},
		},
		options: [
			{
				displayName: 'Work Email Enrichment',
				name: 'workEmailEnrichment',
				type: 'boolean',
				default: true,
				description: 'Find and verify work email addresses',
			},
			{
				displayName: 'Fully Enriched Profile',
				name: 'fullyEnrichedProfile',
				type: 'boolean',
				default: true,
				description: 'Complete profile enrichment with all available data',
			},
			{
				displayName: 'Email Verification',
				name: 'emailVerification',
				type: 'boolean',
				default: false,
				description: 'Verify email addresses for deliverability',
			},
			{
				displayName: 'Job Listing',
				name: 'jobListing',
				type: 'boolean',
				default: true,
				description: 'Include job posting and career information',
			},
			{
				displayName: 'Technologies',
				name: 'technologies',
				type: 'boolean',
				default: true,
				description: 'Company technology stack and tools used',
			},
			{
				displayName: 'News',
				name: 'news',
				type: 'boolean',
				default: true,
				description: 'Recent company news and announcements',
			},
			{
				displayName: 'Funding',
				name: 'funding',
				type: 'boolean',
				default: true,
				description: 'Company funding rounds and investment data',
			},
		],
		description: 'Types of enrichment to apply to the resource',
	},

	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['addToResource'],
			},
		},
		options: [
			{
				displayName: 'Auto Update',
				name: 'autoUpdate',
				type: 'boolean',
				default: true,
				description: 'Automatically enrich new leads added to the resource',
			},
			{
				displayName: 'Skip Rows Without Email',
				name: 'skipRowsWithoutEmail',
				type: 'boolean',
				default: true,
				description: 'Skip enrichment for leads without email addresses',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 1000,
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
				description: 'Maximum number of leads to enrich in this batch',
			},
		],
		description: 'Additional settings for the enrichment process',
	},

	// RUN SUPERSEARCH ENRICHMENT PARAMETERS
	{
		displayName: 'Run Options',
		name: 'runOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['superSearchEnrichment'],
				operation: ['run'],
			},
		},
		options: [
			{
				displayName: 'Lead IDs',
				name: 'leadIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				placeholder: '01234567-89ab-cdef-0123-456789abcdef',
				description: 'Specific lead IDs to enrich (leave empty to enrich all unenriched leads)',
			},
			{
				displayName: 'Enrichment Type',
				name: 'enrichmentType',
				type: 'options',
				options: [
					{
						name: 'Work Email Enrichment',
						value: 'work_email_enrichment',
					},
					{
						name: 'Fully Enriched Profile',
						value: 'fully_enriched_profile',
					},
					{
						name: 'Email Verification',
						value: 'email_verification',
					},
					{
						name: 'Job Listing',
						value: 'joblisting',
					},
					{
						name: 'Technologies',
						value: 'technologies',
					},
					{
						name: 'News',
						value: 'news',
					},
					{
						name: 'Funding',
						value: 'funding',
					},
				],
				default: 'work_email_enrichment',
				description: 'Type of enrichment to run',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
				description: 'Maximum number of leads to enrich',
			},
		],
		description: 'Options for running the enrichment',
	},
];
