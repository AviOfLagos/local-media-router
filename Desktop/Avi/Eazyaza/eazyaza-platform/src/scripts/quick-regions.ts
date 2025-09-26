import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import {
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  updateStoresWorkflow
} from "@medusajs/medusa/core-flows";

export default async function quickSeedRegions({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const storeModuleService = container.resolve(Modules.STORE);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("🌍 Quick seeding essential regions...");

  try {
    // Get or create default sales channel
    let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
      name: "Default Sales Channel",
    });

    if (!defaultSalesChannel.length) {
      const { result: salesChannelResult } = await createSalesChannelsWorkflow(container).run({
        input: {
          salesChannelsData: [{ name: "Default Sales Channel" }],
        },
      });
      defaultSalesChannel = salesChannelResult;
    }

    // Get store and update currencies
    const [store] = await storeModuleService.listStores();

    await updateStoresWorkflow(container).run({
      input: {
        selector: { id: store.id },
        update: {
          supported_currencies: [
            { currency_code: "usd", is_default: true },
            { currency_code: "eur" },
            { currency_code: "gbp" },
            { currency_code: "cad" },
            { currency_code: "ngn" }
          ],
          default_sales_channel_id: defaultSalesChannel[0].id,
        },
      },
    });

    // Create essential regions
    const regions = [
      {
        name: "United States",
        currency_code: "usd",
        countries: ["us"],
        payment_providers: ["pp_system_default"]
      },
      {
        name: "Canada",
        currency_code: "cad",
        countries: ["ca"],
        payment_providers: ["pp_system_default"]
      },
      {
        name: "United Kingdom",
        currency_code: "gbp",
        countries: ["gb"],
        payment_providers: ["pp_system_default"]
      },
      {
        name: "Europe",
        currency_code: "eur",
        countries: ["fr", "de", "es", "it"],
        payment_providers: ["pp_system_default"]
      },
      {
        name: "Nigeria",
        currency_code: "ngn",
        countries: ["ng"],
        payment_providers: ["pp_system_default"]
      }
    ];

    logger.info("Creating regions...");
    await createRegionsWorkflow(container).run({
      input: { regions }
    });

    logger.info("✅ Successfully created regions:");
    regions.forEach(r => logger.info(`  • ${r.name} (${r.currency_code.toUpperCase()})`));

  } catch (error) {
    logger.error("❌ Error:", error.message);
    throw error;
  }
}