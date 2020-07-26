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

		await BB.reset();

		expect(resetFilter).toHaveBeenCalledTimes(1);
	});

	test(`should boot even without optioons`, async () => {
		const BB = new BlueBase();
		await BB.boot();
		expect(BB.Configs.size()).toBe(10);
	});
});
