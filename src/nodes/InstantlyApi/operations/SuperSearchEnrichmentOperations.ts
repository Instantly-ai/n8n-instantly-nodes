import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { instantlyApiRequest } from '../../generic.functions';
import { paginateInstantlyApi } from '../functions/paginationHelpers';
import { getResourceLocatorValue } from '../functions/resourceLocatorHelpers';

/**
 * SuperSearch Enrichment operations handler
 * NEW FEATURE: Added September 4, 2025
 *
 * SuperSearch Enrichments provide AI-powered lead enrichment with:
 * - 450M+ contact database
 * - Waterfall enrichment from 5+ providers
 * - AI personalization with GPT-4o, GPT-5, Claude
 * - Company intelligence and funding data
 * - Email verification
 */
export class SuperSearchEnrichmentOperations {
	/**
	 * Create a new SuperSearch enrichment
	 */
	static async create(context: IExecuteFunctions, itemIndex: number): Promise<any> {
		const name = context.getNodeParameter('name', itemIndex) as string;
		const searchFilters = context.getNodeParameter('searchFilters', itemIndex, {}) as any;
		const enrichmentSettings = context.getNodeParameter('enrichmentSettings', itemIndex, {}) as any;
		const additionalFields = context.getNodeParameter('additionalFields', itemIndex, {}) as any;

		// Build the request body according to API specification
		const body: any = {
			// Required enrichment payload with 7 boolean enrichment types
			enrichment_payload: {
				work_email_enrichment: enrichmentSettings.workEmailEnrichment ?? true,
				fully_enriched_profile: enrichmentSettings.fullyEnrichedProfile ?? true,
				email_verification: enrichmentSettings.emailVerification ?? false,
				joblisting: enrichmentSettings.jobListing ?? true,
				technologies: enrichmentSettings.technologies ?? true,
				news: enrichmentSettings.news ?? true,
				funding: enrichmentSettings.funding ?? true,
			},

			// Proper search filters structure as nested object
			search_filters: {
				locations: searchFilters.locations || [],
				department: searchFilters.department || [],
				level: searchFilters.level || [],
				employeeCount: searchFilters.employeeCount || [],
				revenue: searchFilters.revenue || [],
				news: searchFilters.news || [],
				title: searchFilters.title || {},
				name: searchFilters.name || [],
				companyName: searchFilters.companyName || {},
				lookAlike: searchFilters.lookAlike || '',
				keywordFilter: searchFilters.keywordFilter || {},
				industry: searchFilters.industry || {},
				domains: searchFilters.domains || [],
				fundingType: searchFilters.fundingType || [],
				skipOwnedLeads: searchFilters.skipOwnedLeads ?? true,
				showOneLeadPerCompany: searchFilters.showOneLeadPerCompany ?? true,
			},

			// Correct field names per API specification
			search_name: name.trim(),
			limit: additionalFields.maxResults || 100,
		};

		// Add required fields
		if (additionalFields.resourceId) {
			body.resource_id = additionalFields.resourceId;
		}
		if (additionalFields.resourceType !== undefined) {
			body.resource_type = additionalFields.resourceType;
		}

		// Add optional fields
		if (additionalFields.listName) {
			body.list_name = additionalFields.listName;
		}
		if (additionalFields.autoUpdate !== undefined) {
			body.auto_update = additionalFields.autoUpdate;
		}
		if (additionalFields.skipRowsWithoutEmail !== undefined) {
			body.skip_rows_without_email = additionalFields.skipRowsWithoutEmail;
		}

		// Make API request and return properly formatted n8n items
		const response = await instantlyApiRequest.call(context, 'POST', '/api/v2/supersearch-enrichment', body);
		return [{ json: response }];
	}

	/**
	 * Get a SuperSearch enrichment by resource ID
	 */
	static async get(context: IExecuteFunctions, itemIndex: number): Promise<any> {
		const resourceIdLocator = context.getNodeParameter('resourceId', itemIndex) as any;
		const resourceId = getResourceLocatorValue(resourceIdLocator);
		const getAllEnrichments = context.getNodeParameter('getAllEnrichments', itemIndex, false) as boolean;

		// Add query parameters if getting all enrichments
		const queryParams = getAllEnrichments ? { all: true } : {};

		const response = await instantlyApiRequest.call(context, 'GET', `/api/v2/supersearch-enrichment/${resourceId}`, {}, queryParams);
		return [{ json: response }];
	}

	/**
	 * Run a SuperSearch enrichment
	 */
	static async run(context: IExecuteFunctions, itemIndex: number): Promise<any> {
		const enrichmentIdLocator = context.getNodeParameter('enrichmentId', itemIndex) as any;
		const enrichmentId = getResourceLocatorValue(enrichmentIdLocator);
		const runOptions = context.getNodeParameter('runOptions', itemIndex, {}) as any;

		const body: any = {
			enrichment_id: enrichmentId,
		};

		// Add run options
		if (runOptions.leadIds && runOptions.leadIds.length > 0) {
			body.lead_ids = runOptions.leadIds;
		}
		if (runOptions.enrichmentType) {
			body.enrichment_type = runOptions.enrichmentType;
		}
		if (runOptions.limit) {
			body.limit = runOptions.limit;
		}

		const response = await instantlyApiRequest.call(context, 'POST', '/api/v2/supersearch-enrichment/run', body);
		return [{ json: response }];
	}

	/**
	 * Add enrichment to a resource (campaign or lead list)
	 */
	static async addToResource(context: IExecuteFunctions, itemIndex: number): Promise<any> {
		const resourceIdLocator = context.getNodeParameter('resourceId', itemIndex) as any;
		const resourceId = getResourceLocatorValue(resourceIdLocator);
		const enrichmentTypes = context.getNodeParameter('enrichmentTypes', itemIndex, {}) as any;
		const additionalOptions = context.getNodeParameter('additionalOptions', itemIndex, {}) as any;

		// Build enrichment payload from enrichment types
		const enrichmentPayload: any = {
			work_email_enrichment: enrichmentTypes.workEmailEnrichment ?? true,
			fully_enriched_profile: enrichmentTypes.fullyEnrichedProfile ?? true,
			email_verification: enrichmentTypes.emailVerification ?? false,
			joblisting: enrichmentTypes.jobListing ?? true,
			technologies: enrichmentTypes.technologies ?? true,
			news: enrichmentTypes.news ?? true,
			funding: enrichmentTypes.funding ?? true,
		};

		const body: any = {
			enrichment_payload: enrichmentPayload,
		};

		// Add additional options
		if (additionalOptions.autoUpdate !== undefined) {
			body.auto_update = additionalOptions.autoUpdate;
		}
		if (additionalOptions.skipRowsWithoutEmail !== undefined) {
			body.skip_rows_without_email = additionalOptions.skipRowsWithoutEmail;
		}
		if (additionalOptions.limit) {
			body.limit = additionalOptions.limit;
		}

		const response = await instantlyApiRequest.call(context, 'POST', `/api/v2/supersearch-enrichment/${resourceId}/add`, body);
		return [{ json: response }];
	}

	/**
	 * Run AI enrichment on existing data
	 */
	static async runAiEnrichment(context: IExecuteFunctions, itemIndex: number): Promise<any> {
		const resourceId = context.getNodeParameter('resourceId', itemIndex) as string;
		const outputColumn = context.getNodeParameter('outputColumn', itemIndex) as string;
		const resourceType = context.getNodeParameter('resourceType', itemIndex) as number;
		const modelVersion = context.getNodeParameter('modelVersion', itemIndex) as string;
		const additionalSettings = context.getNodeParameter('additionalSettings', itemIndex, {}) as any;

		const body: any = {
			resource_id: resourceId,
			output_column: outputColumn,
			resource_type: resourceType,
			model_version: modelVersion,
		};

		// Add optional AI settings per API specification
		if (additionalSettings.inputColumns && additionalSettings.inputColumns.length > 0) {
			body.input_columns = additionalSettings.inputColumns;
		}
		if (additionalSettings.useInstantlyAccount !== undefined) {
			body.use_instantly_account = additionalSettings.useInstantlyAccount;
		}
		if (additionalSettings.overwrite !== undefined) {
			body.overwrite = additionalSettings.overwrite;
		}
		if (additionalSettings.autoUpdate !== undefined) {
			body.auto_update = additionalSettings.autoUpdate;
		}
		if (additionalSettings.skipLeadsWithoutEmail !== undefined) {
			body.skip_leads_without_email = additionalSettings.skipLeadsWithoutEmail;
		}
		if (additionalSettings.limit) {
			body.limit = additionalSettings.limit;
		}
		if (additionalSettings.prompt) {
			body.prompt = additionalSettings.prompt;
		}
		if (additionalSettings.templateId) {
			body.template_id = additionalSettings.templateId;
		}

		const response = await instantlyApiRequest.call(context, 'POST', '/api/v2/supersearch-enrichment/ai', body);
		return [{ json: response }];
	}

	/**
	 * Get enrichment history for a resource
	 */
	static async getHistory(context: IExecuteFunctions, itemIndex: number): Promise<any> {
		const resourceIdLocator = context.getNodeParameter('resourceId', itemIndex) as any;
		const resourceId = getResourceLocatorValue(resourceIdLocator);
		const returnAll = context.getNodeParameter('returnAll', itemIndex, false) as boolean;
		const limit = context.getNodeParameter('limit', itemIndex, 50) as number;

		// Validate limit doesn't exceed 100
		if (limit > 100) {
			throw new NodeOperationError(context.getNode(), 'Limit cannot exceed 100. Instantly API has a maximum limit of 100.', { itemIndex });
		}

		if (returnAll) {
			// Get all history with pagination
			const allHistory = await paginateInstantlyApi(context, `/api/v2/supersearch-enrichment/history/${resourceId}`, 'history');
			return allHistory.map((item: any) => ({ json: item }));
		} else {
			// Get single page with specified limit
			const queryParams = { limit };
			const response = await instantlyApiRequest.call(context, 'GET', `/api/v2/supersearch-enrichment/history/${resourceId}`, {}, queryParams);
			return [{ json: response }];
		}
	}

	/**
	 * Get resources (campaigns and lists) for resource locator dropdown
	 */
	static async getResources(context: IExecuteFunctions): Promise<any[]> {
		try {
			// Get campaigns
			const campaigns = await instantlyApiRequest.call(context, 'GET', '/api/v2/campaigns');
			const campaignOptions = campaigns.map((campaign: any) => ({
				name: `Campaign: ${campaign.name}`,
				value: campaign.id,
			}));

			// Get lead lists
			const leadLists = await instantlyApiRequest.call(context, 'GET', '/api/v2/lead-lists');
			const listOptions = leadLists.map((list: any) => ({
				name: `List: ${list.name}`,
				value: list.id,
			}));

			return [...campaignOptions, ...listOptions];
		} catch (error) {
			// Return empty array if API calls fail
			return [];
		}
	}

	/**
	 * Get enrichments for enrichment locator dropdown
	 */
	static async getEnrichments(context: IExecuteFunctions): Promise<any[]> {
		try {
			// Note: This would need to be implemented based on available API endpoints
			// For now, return empty array as there's no direct "list enrichments" endpoint
			return [];
		} catch (error) {
			return [];
		}
	}
}
