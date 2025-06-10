import { formatMoney } from '@shopify/theme-currency';

/**
 * Formats the product variant's price.
 * @function formatThePrice
*/
export default function formatThePrice(price) {

	return formatMoney(price, Shopify.moneyformat).replace('.00', '');

}
