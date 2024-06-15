
import useGenericFilterHook from "./useGenericFilterHook";

const EntitySearchPage = () => {
    // Initial filter values for entity1
    const initialEntity1Filter = {
        search: {},
        pageable: {
            page: 0,
            size: 5,
            order: 'ASC',
            orderBy: 'id',
            totalPages: 0,
            totalElements: 0,
        },
    };

    // Initial filter values for entity2
    const initialEntity2Filter = {
        search: {},
        pageable: {
            page: 0,
            size: 5,
            order: 'ASC',
            orderBy: 'id',
            totalPages: 0,
            totalElements: 0,
        },
    };

    // Use the custom hook for entity1
    const { filter: entity1Filter, updateFilter: updateEntity1Filter, resetFilter: resetEntity1Filter } =
        useGenericFilterHook('entity1', initialEntity1Filter);

    // Use the custom hook for entity2
    const { filter: entity2Filter, updateFilter: updateEntity2Filter, resetFilter: resetEntity2Filter } =
        useGenericFilterHook('entity2', initialEntity2Filter);

    // Example: Handle search for entity1
    const handleEntity1Search = () => {
        // Perform search using entity1 filter parameters
        console.log('Entity1 search submitted:', entity1Filter);
        // Implement your search logic here
    };

    // Example: Handle search for entity2
    const handleEntity2Search = () => {
        // Perform search using entity2 filter parameters
        console.log('Entity2 search submitted:', entity2Filter);
        // Implement your search logic here
    };

    return (
        <div>
            {/* Render your search forms and components */}
            <div>
                <h2>Entity 1 Search</h2>
                <input
                    type="text"
                    placeholder="Keyword"
                    value={entity1Filter.search.keyword || ''}
                    onChange={(e) => updateEntity1Filter({ search: { keyword: e.target.value } })}
                />
                {/* Other input fields for entity1 */}
                <button onClick={resetEntity1Filter}>Reset Entity 1 Filter</button>
                <button onClick={handleEntity1Search}>Search Entity 1</button>
            </div>

            <div>
                <h2>Entity 2 Search</h2>
                <input
                    type="text"
                    placeholder="Keyword"
                    value={entity2Filter.search.keyword || ''}
                    onChange={(e) => updateEntity2Filter({ search: { keyword: e.target.value } })}
                />
                {/* Other input fields for entity2 */}
                <button onClick={resetEntity2Filter}>Reset Entity 2 Filter</button>
                <button onClick={handleEntity2Search}>Search Entity 2</button>
            </div>
        </div>
    );
};

export default EntitySearchPage;
