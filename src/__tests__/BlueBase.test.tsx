import { BlueBase } from '../BlueBase';

describe('BlueBase', () => {
	test(`should execute reset filter on reboot`, async () => {
		const BB = new BlueBase();

		const resetFilter = jest.fn();

		await BB.boot({
			filters: {
				'bluebase.reset': resetFilter,
			},
		});

		expect(resetFilter).toHaveBeenCalledTimes(0);

		await BB.reboot();

		expect(resetFilter).toHaveBeenCalledTimes(1);
	});
});
