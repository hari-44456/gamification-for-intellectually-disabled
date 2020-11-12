const router = require('express').Router();
const StudentScore = require('../models/StudentScore');
const { verifyToken } = require('../verify');

router.post('/', verifyToken, async (req, res) => {
	try {
		const { sid = -1, g1 = -1, g2 = -1, g3 = -1, g4 = -1 } = req.body;

		StudentScore.findOne({ sid }, async (err, doc) => {
			if (err) return res.status(400).send('Error...');

			if (!doc) {
				const newDoc = new StudentScore({
					sid,
					scores: { g1, g2, g3, g4 },
				});

				try {
					const result = await newDoc.save();
					return res
						.status(200)
						.send(`score saved... ${JSON.stringify(result)}`);
				} catch (err) {
					return res
						.status(400)
						.send(
							`error while saving the document ${JSON.stringify(
								err,
							)}`,
						);
				}
			}

			// Update doc
			const getIndex = (scores, match) => {
				for (let i = 0; i < scores.length; i++)
					if (scores[i].date.localeCompare(match) == 0) return i;
				return -1;
			};

			const index = getIndex(
				doc.scores,
				new Date().toISOString().substring(0, 10),
			);

			if (index == -1) doc.scores.push({ g1, g2, g3, g4 });
			else {
				if (g1 > doc.scores[index].g1) doc.scores[index].g1 = g1;
				if (g2 > doc.scores[index].g2) doc.scores[index].g2 = g2;
				if (g3 > doc.scores[index].g3) doc.scores[index].g3 = g3;
				if (g4 > doc.scores[index].g4) doc.scores[index].g4 = g4;
			}
			try {
				const result2 = await doc.save();
				return res
					.status(200)
					.send(`updated successfully...${JSON.stringify(result2)}`);
			} catch (error) {
				console.log('err');
				return res.status(400).send(error);
			}
		});
	} catch (err) {
		console.log('Data incomplete', err);
		res.status(400).send(err);
	}
});

module.exports = router;
